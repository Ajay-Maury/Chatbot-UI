import contactsvg from "../assets/svg/contact.svg";
import formSvg from "../assets/svg/form.svg";
import uploadDocumentSvg from "../assets/svg/upload-document.svg";
import submitSvg from "../assets/svg/submit-document.svg";

export interface iSubList {
  title: string;
  list: string[];
}

interface iInstructionData {
  icon: string;
  title: string;
  lists: string[] | iSubList[];
  type?: string | undefined;
}

export const instructionData: iInstructionData[] = [
  {
    icon: formSvg,
    title: "Fill out the application",
    lists: [
      "You have to enter your full name, contact number with the right country code, date of birth and gender.",
      "Please paste exact LinkedIn URL so that using the link we should be able to view your profile.",
    ],
  },
  {
    icon: uploadDocumentSvg,
    title: "Upload the relevant document",
    type: "sublist",
    lists: [
      {
        title: "Upload Photo Instructions",
        list: [
          "Upload a passport-style photo in JPEG format with dimensions of 2x2 inches (51x51 millimeters) and a maximum file size of 200 KB.",
          "Ensure a plain white background, facing forward with a neutral expression, and no hats or accessories obscuring the face.",
          "Review the photo for clarity, good lighting, and focus before uploading.",
        ],
      },
      {
        title: "Upload CV Instructions",
        list: [
          "Please upload your CV in a PDF format with maximum size of 5MB. And the CV should contain the following :  Your Education, Skills, Achievements & Awards, Work Experience (if any) and Volunteer Work.",
        ],
      },
      {
        title: "Upload High School Certificate Instructions",
        list: [
          "Please upload your High school certificate in a PDF format only with max size of 5MB.",
        ],
      },
      {
        title: "Upload Video Instructions",
        list: [
          "Please follow all the instructions listed in step 3.",
        ],
      },
    ],
  },
  {
    icon: submitSvg,
    title: "Pay application fee & Submit the form",
    lists: [
      "By payment of the application fee including of the Government of India mandated taxes, you can submit the application. You will receive email confirming the same.",
    ],
  },
];
