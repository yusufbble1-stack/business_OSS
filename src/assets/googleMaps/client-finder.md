---
name: client-finder
description: Find physical-product brands to sell short motion-design ads to, and collect their public contact emails into a clean prospect list ready for cold outreach. Use this skill whenever the user wants to find clients for motion design or product video, build a lead or prospect list for their motion work, do prospecting or cold outreach to brands, collect contact emails, or asks things like "who can I sell motion design to", "find me brands to pitch video", "find me leads", or "build me a list", even if they never say the word "skill".
---
 
# Client Finder
 
This skill finds clients for selling short motion-design ads. The target is always physical-product brands, because a physical product is what looks premium in motion, which is exactly what you are selling. The output is a clean list of those brands with a real public contact email each, ready to load into a cold-email sequencer.
 
The core idea: the right clients cluster in a few predictable places, their contact details are already public, and an AI with web access can gather and clean them far faster than a human. You run a short collection loop once per niche-and-source, stack the runs into one sheet, clean it, and verify it.
 
## Step 1: Know who you are looking for
 
The target is fixed: small to mid-size brands that sell a physical product. They are the right clients because a physical product is what looks premium in motion, and those founders have a real reason to pay for a video. Stay on this profile and do not drift into software, services, or B2B companies with nothing physical to show.
 
Good source types, where these brands gather:
- Crowdfunding campaigns on Kickstarter and Indiegogo, where founders are launching a product now and need a video to hit their goal.
- Online stores on Shopify, already selling but usually with flat static photos.
- Startup directories like Y Combinator, full of newly funded companies. Note that these skew toward software and deep tech, so keep only the consumer physical-product ones.
- Local businesses on Google Maps, like coffee roasters, beverage brands, and boutique shops with a real product and an email on their page.
## Step 2: Run the collection loop
 
Run this once per niche-and-source combination. Use web search for every run, and never answer from memory.
 
```
Use web search for all of this. Do not answer from memory, and do not invent anything.
 
Goal: find physical-product brands I can sell a short motion-design ad to, each with a real public contact email.
THIS RUN, focus on: {{NICHE}} on {{SOURCE}}.
 
For each business, search the web and collect:
- Company name
- Official website, confirmed as the company's own site, not a press article or a directory
- One real contact email found on their site or another citable public page, preferring a founder address or a general inbox like hello@ or info@
- A one-line description of the product or business
- The source you found them through
 
Rules:
- Only include an email you actually found on a real, citable page. Never guess or build an address from a pattern. If you cannot find one, leave it blank.
- Confirm each website is the company's own official site before listing it.
- Match the profile only. Skip anything outside it.
- One row per company, no duplicates.
- Find as many as you genuinely can in this run.
 
Output a clean table with those columns, plus a count of how many companies you found and how many had an email.
```
 
Swap NICHE and SOURCE each run. Niche examples: skincare, coffee, supplements, candles, audio gadgets, kitchenware, eyewear, pet products. Source examples: Shopify stores, Kickstarter campaigns, Indiegogo campaigns, Y Combinator companies, or local businesses in a named city.
 
Expect roughly twenty to forty solid rows per run. Reaching a few hundred means running ten to fifteen combinations and stacking the results, so set that expectation up front rather than promising hundreds from a single run.
 
## Step 3: Stack and deduplicate
 
Combine every run into one sheet. Remove duplicates by website domain first, then by email, so the same brand found through two sources only appears once. Keep a Source column so the list can be segmented later.
 
## Step 4: Clean for fit
 
A raw stacked list always carries noise. Remove it in this order, because a smaller list of the right people beats a large list of the wrong ones every time:
 
- Drop businesses that do not match the profile, for example software, services, and anything with no physical product when the goal is product video.
- Drop dead-end department addresses such as legal@, careers@, jobs@, hr@, pr@, and press@. If the company is a good fit, try to find a better inbox like hello@ or info@ on the same domain instead of losing it.
- Drop very large or well-known brands that already have agencies, since they will not hire a freelancer.
- Drop true service businesses like spas, salons, clinics, law firms, and dealerships when selling product video. Match on whole words so a "PowerBank" is not mistaken for a bank and a "Workspace" is not mistaken for a spa.
- Where a description exists, prefer distinctive, visual, design-led products, since those are the easiest to sell motion to.
## Step 5: Verify before sending
 
Run the cleaned emails through an email verifier so nothing bounces, since a high bounce rate gets a sending domain flagged. Drop anything risky, and aim to keep bounces under three percent. Only then is the list ready for outreach.
 
## Output format
 
Deliver one table with these columns: Company, Industry or Type, Product Description, Contact Name, Job Title, Email, Email Type (personal or generic), Source, Website. Offer it as a spreadsheet the user can download and load into their sequencer.
 
## Guardrails
 
- Gather only contact details a business has chosen to publish. This is normal prospecting, not anything covert.
- Never fabricate an email or a fact about a company. A blank cell is fine, a made-up address is not.
- When the user moves to sending, remind them to send in small daily batches from warmed inboxes, keep one link and a plain-text style, and include an opt-out and a business address so the outreach stays compliant and out of spam.