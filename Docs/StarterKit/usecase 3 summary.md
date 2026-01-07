Use Textract to extract text from medical records, then use a text model on Bedrock to produce a concise, structured patient history-including diagnoses, medications, allergies, procedures, relevant labs, and a timeline-so clinicians and analysts can review a chart in minutes instead of hours.

## When to Use

Use this when:

- The project use scanned PDFs or mixed‑quality records that require OCR.
- Care teams need quick patient history snapshots (diagnoses, meds, allergies) or care‑plan context.
- Analysts need claims/clinical abstraction with references back to source pages.

## Prerequisites

- Python 3.9+
- Tenant access: Tenant is onboarded and models access is granted.
- Sample medical record within platform limits (pages/size) that is available in Base64 format.