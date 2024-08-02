import { Job } from "@prisma/client";

function leadMessage(job: Job) {
  return `Hey ${job.name},

This is CBMR (Chris Board Metal Roofing). Just following up on the lead we recently accepted on hipages. Could you please send us the address for the job? We'll work on getting you a quote as soon as possible.

Once we have the address, we can usually provide a quote online, or at least give you an estimate. If you're happy with the quote, someone from CBMR will come out to do an inspection.

Looking forward to your response!

Regards,
CBMR`;
}

function cancelJob(job: { name: string; address: string }) {
  return `Hey ${job.name},
  This is Daniel from CBMR (Chris Board Metal Roofing). Thank you for 
  reaching out to CBMR through our website. Unfortunately, due to the high 
  workload we are currently experiencing, we won’t be able to attend 
  the work order at: 
  ${job.address}
  Thank you again and good luck with your project. 
  Regards, Daniel
  CBMR`;
}

function onlineMeasureUpQuote(job: {
  name: string;
  address: string;
  email: string;
}) {
  return `Dear ${job.name},

  Thank you for considering Chris Board Metal Roofing (CBMR) for your roofing needs. We're pleased to inform you that we've completed your quote for the property at:
  
  ${job.address}
  
  Using advanced satellite imagery from Queensland Globe, we've accurately measured your roof to ensure a precise and competitive quote. We've sent the detailed quote to:
  
  ${job.email}
  
  If the quote meets your expectations, we'd be happy to schedule a site visit with Chris to discuss any specifics and address any questions you may have.
  
  For more information about our services, quality materials, and past projects, please visit our website:
  www.cbroofing.com.au
  
  Should you have any questions or require further clarification, please don't hesitate to reach out. We're here to ensure your roofing project is a success.
  
  We look forward to the possibility of working with you and providing you with a top-quality metal roof.
  
  Best regards,
  The CBMR Team`;
}

function drawingMeasureUpQuote(job: {
  name: string;
  address: string;
  email: string;
}) {
  return `Hey ${job.name},
  This is Daniel from CBMR (Chris Board Metal Roofing). 
  Thank you for the opportunity to quote the job at: 
  ${job.address}
  We have finalised the quote and sent it to: 
  ${job.email}
  Feel free to check out our website for more information about our company. 
  www.cbroofing.com.au 
  If you have any questions, please don't hesitate to ask. We look forward to hearing from you 
  shortly  
  Regards, Daniel
  CBMR`;
}

// function quoteEmail(job) {}

export { leadMessage, cancelJob, onlineMeasureUpQuote, drawingMeasureUpQuote };
