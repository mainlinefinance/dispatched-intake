import Script from "next/script";

/* ===========================================================================
   Loads ActiveProspect TrustedForm and Verisk Jornaya LeadiD scripts when
   NEXT_PUBLIC_TCPA_ENABLED === "true". In dev these scripts hit third-party
   servers and create real cert records, so we keep them off by default.

   When loaded, both scripts inject hidden inputs into any <form> on the
   page:
     - TrustedForm:  <input name="xxTrustedFormCertUrl" value="...cert URL...">
     - Jornaya:      <input id="leadid_token" name="leadid_token" value="...">

   The /insurance/quote route handler reads both names and validates against
   the strict regex in lib/insuranceValidation.ts. Production should also
   set INSURANCE_LEAD_REQUIRE_TCPA=true on the server side so missing
   artifacts are a hard fail.

   Configuration (set via Render env vars or local .env):
     NEXT_PUBLIC_TCPA_ENABLED=true
     NEXT_PUBLIC_TRUSTEDFORM_FIELD=xxTrustedFormCertUrl   (default; rarely changed)
     NEXT_PUBLIC_JORNAYA_ACCOUNT_ID=<your-LeadiD-account-id>
   =========================================================================== */

export default function TcpaScripts() {
  if (process.env.NEXT_PUBLIC_TCPA_ENABLED !== "true") return null;

  const jornayaAccountId = process.env.NEXT_PUBLIC_JORNAYA_ACCOUNT_ID;
  const trustedFormField =
    process.env.NEXT_PUBLIC_TRUSTEDFORM_FIELD ?? "xxTrustedFormCertUrl";

  return (
    <>
      <Script
        id="trustedform"
        strategy="afterInteractive"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `(function(){var tf=document.createElement('script');tf.type='text/javascript';tf.async=true;tf.src=('https:'==document.location.protocol?'https':'http')+'://api.trustedform.com/trustedform.js?field=${trustedFormField}&l='+new Date().getTime()+Math.random();var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(tf,s);})();`,
        }}
      />
      {jornayaAccountId ? (
        <Script
          id="jornaya-leadid"
          strategy="afterInteractive"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=document.createElement('script');s.id='LeadiDscript_campaign';s.type='text/javascript';s.async=true;s.src='//create.lidstatic.com/campaign/${jornayaAccountId}.js?snippet_version=2';var p=document.getElementsByTagName('script')[0];p.parentNode.insertBefore(s,p);})();`,
          }}
        />
      ) : null}
    </>
  );
}
