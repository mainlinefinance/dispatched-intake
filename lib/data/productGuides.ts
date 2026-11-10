import type { ProductSlug } from "./products";

/* ===========================================================================
   Plain-language guide copy for each trucking insurance product: what the
   coverage pays for, what it leaves out, the federal context, and what to
   check on a quote. Read by the product hub (/insurance/{product}) and, in
   brief form, by the carrier reviews (/carriers/{carrier}).

   Everything here is general description of how the coverage form works and
   of published federal rules. No prices, no carrier-specific terms: those
   come from the policy and the producer.
   =========================================================================== */

export type ProductGuide = {
  /* One or two sentences, used where several products are listed together. */
  inBrief: string;
  covers: string;
  doesNotCover: readonly string[];
  federalContext: string;
  checkOnQuote: readonly string[];
  /* How the coverage is structured and underwritten, how it sits beside the
     other coverages, and the mistakes operators most often make with it. */
  inPractice: string;
};

const GUIDES: Record<ProductSlug, ProductGuide> = {
  "primary-liability": {
    inBrief:
      "The auto liability policy behind a motor carrier's operating authority. It pays other people for injuries and property damage from a crash; it does not pay for the insured truck, the freight, or the driver.",
    covers:
      "Primary liability responds when a truck operating under your authority injures someone or damages their property: medical bills, lost income, vehicle and property repair, and the cost of defending the claim. It is third-party coverage. The other driver, the passengers, and the owner of the guardrail are the ones it pays.",
    doesNotCover: [
      "Damage to your own tractor or trailer, which is what physical damage coverage is for.",
      "The freight on board, which is a motor truck cargo claim.",
      "Injuries to you or your driver, which fall under workers' compensation or occupational accident coverage.",
      "A leased-on owner-operator's personal use of the truck, which is the gap non-trucking liability fills.",
    ],
    federalContext:
      "The insurer files proof of coverage with FMCSA on Form BMC-91 or BMC-91X, and the policy carries the MCS-90 endorsement. Authority does not become active until that filing is on record, and the insurer has to give FMCSA 30 days' notice before a cancellation takes effect.",
    checkOnQuote: [
      "The limit your brokers and shippers require in writing, which is often higher than the federal minimum.",
      "The operating radius and the commodities listed on the application; hauling outside them can void coverage.",
      "Which drivers and which power units are scheduled on the policy.",
    ],
    inPractice:
      "Primary liability is written with a combined single limit per accident, and the limit most broker-carrier agreements ask for is higher than the federal minimum for general freight. Underwriters price it on the people and the operation: driver motor vehicle records and years of experience, the garaging location, the operating radius, the commodities hauled, the age of the authority, and loss runs from prior insurers. Roadside inspection and crash data in FMCSA's safety systems are part of the picture too. The policy is usually scheduled, meaning it lists specific power units and drivers, so adding a truck or a driver mid-term has to be reported before the unit rolls. A common mistake is treating the certificate of insurance as the policy. The certificate shows that coverage exists on the day it was issued; the radius, commodity, and driver conditions that decide whether a claim is paid are in the policy itself.",
  },
  "motor-truck-cargo": {
    inBrief:
      "Covers the freight while it is in the carrier's care. Brokers and shippers ask for it by contract, and the exclusions list matters as much as the limit.",
    covers:
      "Motor truck cargo pays for loss of or damage to freight while it is in your care, custody, and control: collision or overturn, fire, theft, and loading and unloading damage where the form includes it. It exists because a carrier is legally responsible for the freight it accepts.",
    doesNotCover: [
      "Commodities the policy excludes or sub-limits; electronics, alcohol, tobacco, and high-value loads are common examples.",
      "Theft from an unattended truck, under many forms, unless specific conditions are met.",
      "Spoilage from a refrigeration failure, unless reefer breakdown coverage is added.",
      "Losses from improper packing or loading by the shipper, wear, or delay alone.",
    ],
    federalContext:
      "Under the Carmack Amendment (49 U.S.C. 14706) an interstate motor carrier is liable for loss or damage to the goods it transports. FMCSA itself requires a cargo filing only from household goods carriers; for everyone else the requirement comes from the broker or shipper contract.",
    checkOnQuote: [
      "The limit per load against the highest-value load you actually haul.",
      "The excluded-commodities list, read against your real freight mix.",
      "The unattended-vehicle and theft conditions.",
      "Whether the deductible applies per occurrence or per vehicle.",
    ],
    inPractice:
      "Cargo coverage is written with a limit per vehicle or per load and its own deductible, and many forms add a separate, lower limit for certain commodities or for theft. Underwriters ask what you haul, the usual and maximum load values, where equipment is parked overnight, and what the loss history looks like. It sits next to primary liability and does not overlap with it: liability pays third parties for injury and property damage on the road, cargo pays the owner of the freight. Where a broker or shipper asks to be listed as certificate holder, the certificate shows the limit but not the exclusions, so a load can be booked on a certificate that looks adequate and still be uncovered. The usual mistakes are carrying a limit sized for average loads and then accepting one worth more, and assuming a commodity is covered because it was never specifically discussed.",
  },
  "physical-damage": {
    inBrief:
      "Collision and comprehensive coverage for the carrier's own tractor and trailer. Lenders and lessors require it for as long as the equipment is financed.",
    covers:
      "Physical damage pays to repair or replace your own equipment. The collision part responds to a crash or overturn; the comprehensive part responds to fire, theft, vandalism, hail, flood, and animal strikes. A policy can be written on a stated-amount or an actual-cash-value basis, and the difference decides what you are paid after a total loss.",
    doesNotCover: [
      "Mechanical breakdown, engine failure, and ordinary wear.",
      "Tires, unless they are damaged in a covered loss.",
      "A trailer you pull but do not own, unless trailer interchange or non-owned trailer coverage is added.",
      "Income lost while the truck is in the shop, unless downtime or rental reimbursement is added.",
    ],
    federalContext:
      "No federal rule requires physical damage coverage. The requirement comes from the financing: a lender or lessor will ask to be named as loss payee and will set a maximum deductible in the loan or lease agreement.",
    checkOnQuote: [
      "The stated value against what the truck would cost to replace today.",
      "The deductible, separately for collision and comprehensive.",
      "That the lender or lessor is listed as loss payee exactly as the finance agreement names it.",
      "Whether towing and storage after a covered loss are included.",
    ],
    inPractice:
      "Physical damage is the only trucking coverage whose limit is tied to the value of your own equipment, so it should be reviewed whenever a unit is added, sold, or refinanced. Each power unit and trailer is listed with a stated value, and the insurer will usually pay the lesser of that stated value and the actual cash value at the time of loss, which means overstating the value raises the premium without raising the payout. Underwriters ask for the year, make, and value of each unit, the garaging address, the driver list, and prior losses. Collision and comprehensive can carry different deductibles, and a higher deductible lowers the premium at the cost of more out of pocket after a loss. Common mistakes: leaving the stated value unchanged for years as the truck depreciates, and forgetting that a trailer owned by someone else is not covered unless trailer interchange or non-owned trailer coverage has been added.",
  },
  "general-liability": {
    inBrief:
      "Covers the business exposures that are not driving: incidents at a customer's dock or the carrier's own premises. Usually requested by contract.",
    covers:
      "General liability covers what your business can be liable for apart from operating the truck on the road: a customer injured at your yard or office, damage you cause at a shipper's or receiver's premises, and delivery to the wrong location. It also includes personal and advertising injury.",
    doesNotCover: [
      "Crashes and other losses arising from operating the truck, which belong to primary liability.",
      "Freight damage, which belongs to motor truck cargo.",
      "Injuries to your own employees or contracted drivers.",
      "Professional errors and pollution, which usually need separate coverage.",
    ],
    federalContext:
      "General liability is not an FMCSA requirement and there is no federal filing for it. It appears in broker-carrier agreements and shipper contracts, usually alongside a request to be named as certificate holder or additional insured.",
    checkOnQuote: [
      "The per-occurrence and aggregate limits against what your contracts ask for.",
      "Whether additional-insured wording is available when a customer requires it.",
      "How the policy treats loading and unloading, where the line between auto and general liability is drawn.",
      "Whether the carrier offers it packaged with primary liability, which keeps both policies on the same renewal date and with the same claims contact.",
    ],
    inPractice:
      "General liability is written with a limit per occurrence and an annual aggregate, and for trucking operations it is typically a small policy sitting beside the much larger auto liability policy. Underwriters ask about premises you own or lease, whether you load and unload freight yourself, your revenue or payroll, and what contracts you sign. The practical question is where auto liability ends and general liability begins. A claim that arises from operating the truck belongs to the auto policy; a claim from a pallet jack at a receiver's dock, a visitor falling in your yard, or an allegation in your advertising belongs to general liability. Buying both from the same insurer reduces the chance that each points at the other. The common mistake is to skip the coverage because no regulation requires it, and then find that a broker or shipper agreement did, with additional-insured wording the existing policies cannot provide.",
  },
  "non-trucking-liability": {
    inBrief:
      "For owner-operators leased on to a motor carrier: liability coverage for personal use of the truck when it is not under dispatch.",
    covers:
      "A leased-on owner-operator is covered by the motor carrier's primary liability while working under dispatch. Non-trucking liability covers the same truck when it is used for personal, non-business purposes: driving home after a load is delivered, or a personal errand on a day off. Bobtail coverage is a related but different form that follows the tractor whenever it runs without a trailer.",
    doesNotCover: [
      "Any trip made for the motor carrier's business, including driving to pick up a load.",
      "Trips whose purpose is disputed, such as driving to a repair shop at the carrier's direction; forms differ on this.",
      "Damage to the truck itself.",
      "Carriers running under their own authority, who need primary liability.",
    ],
    federalContext:
      "The federal leasing regulations (49 CFR Part 376) require the lease to state who is responsible for which insurance. Read the lease first: it decides whether non-trucking liability, bobtail, or both are your obligation.",
    checkOnQuote: [
      "The policy's definition of business use, word for word.",
      "Whether the limit matches what the lease requires.",
      "Whether coverage applies with a trailer attached.",
    ],
    inPractice:
      "Non-trucking liability is priced as a flat charge per power unit because the exposure is narrow: the truck is covered only while it is not being used in the business of the motor carrier it is leased to. Underwriters ask who the motor carrier is, what the lease says about insurance, and how the truck is used off duty. Bobtail coverage is a related but different form; depending on the wording it can apply whenever the tractor runs without a trailer, including under dispatch, so the two names should not be treated as interchangeable. The coverage works only alongside the motor carrier's primary liability, which is why the lease and the policy have to be read together. The usual mistakes are assuming the policy covers the drive home with an empty trailer after a delivery, which many forms treat as business use, and buying it when running under your own authority, where it does not replace primary liability.",
  },
  "occupational-accident": {
    inBrief:
      "Accident benefits for independent-contractor owner-operators who are not covered by workers' compensation. Motor carriers often require it in the lease.",
    covers:
      "Occupational accident insurance pays benefits when an independent-contractor driver is injured on the job: medical expenses, a disability income benefit while the driver cannot work, and accidental death and dismemberment benefits. It is the usual way an owner-operator who is not an employee gets protection for a work injury.",
    doesNotCover: [
      "Injuries that happen off the job.",
      "Costs beyond the policy's benefit caps and time limits; unlike workers' compensation, benefits are capped.",
      "The motor carrier's own exposure if a contractor is later ruled an employee, which is what contingent liability coverage addresses.",
      "Illness that is not the result of a covered accident, under most forms.",
    ],
    federalContext:
      "This is not workers' compensation and there is no FMCSA filing for it. Whether it satisfies a state's requirements for independent contractors depends on the state, so the answer can differ for the same driver under two different leases.",
    checkOnQuote: [
      "The medical maximum and how long disability income is paid.",
      "The waiting period before disability benefits begin.",
      "Whether the definition of on the job matches how you actually work, including time spent waiting at a dock.",
    ],
    inPractice:
      "Occupational accident coverage is built from separate benefits, each with its own limit: accident medical expense, temporary and continuous total disability income, accidental death and dismemberment, and sometimes a survivor benefit. Each benefit has a maximum amount and a maximum period, and the disability benefit starts after a waiting period. Insurers ask for the motor carrier you are leased to, how you are paid, and confirmation of independent-contractor status. Many motor carriers arrange a group policy and deduct the premium from settlements, so the first step is to find out whether you are already enrolled and under what limits. It does not replace health insurance, because it responds only to covered work accidents. The common mistake is to treat it as equivalent to workers' compensation. Workers' compensation benefits are set by state law; occupational accident benefits are set by the policy, and they stop when the stated limit or time period is reached.",
  },
  "reefer-breakdown": {
    inBrief:
      "An addition to cargo coverage for refrigerated freight: pays for spoilage when the refrigeration unit suffers a mechanical breakdown.",
    covers:
      "Reefer breakdown coverage is added to a motor truck cargo policy. It pays for temperature-sensitive freight that spoils because the refrigeration unit suffered a sudden mechanical or electrical breakdown in transit. Standard cargo forms exclude that loss, so a refrigerated carrier without the addition is uninsured for its most likely claim.",
    doesNotCover: [
      "Spoilage caused by running the unit out of fuel.",
      "A wrong temperature setting or a failure to pre-cool the trailer.",
      "Breakdowns where maintenance records for the unit cannot be produced.",
      "The cost of repairing the refrigeration unit itself.",
    ],
    federalContext:
      "The FDA's Sanitary Transportation rule (21 CFR Part 1, Subpart O) puts temperature-control duties on carriers hauling food, and receivers reject loads on temperature records. No federal rule requires this coverage; shippers and brokers of refrigerated freight ask for it by contract.",
    checkOnQuote: [
      "The maintenance-record condition, and whether your service intervals meet it.",
      "The limit per load against produce, meat, or pharmaceutical load values.",
      "The deductible, which is often separate from the cargo deductible.",
      "Whether the unit's age affects eligibility.",
    ],
    inPractice:
      "Reefer breakdown is an endorsement, so it takes its limit and conditions from the cargo policy it is attached to and usually adds a deductible and conditions of its own. Underwriters ask the age and make of each refrigeration unit, how often it is serviced and by whom, and what commodities are hauled. Because the coverage turns on why the load spoiled, records decide most claims: maintenance invoices for the unit, the temperature download for the trip, the set point written on the bill of lading, and evidence that the trailer was pre-cooled. A load rejected for temperature without a mechanical failure behind it is generally not a breakdown claim. The common mistakes are assuming that a cargo policy covers spoilage without the endorsement, running past the service interval the policy requires, and carrying a limit sized for dry freight when a single load of meat, produce, or pharmaceuticals is worth considerably more.",
  },
};

export function getProductGuide(slug: ProductSlug): ProductGuide {
  return GUIDES[slug];
}
