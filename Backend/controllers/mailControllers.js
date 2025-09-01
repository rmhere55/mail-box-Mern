import { Mail } from "../models/Mail";

export const sendMail = async (req, res) => {
    const {to , subject , body} = req.body;
  try {

    // step 1 : Validate input fields
    if (!to|| !subject || !body) {
        return res.status(400)
        .json({
            message:"All fields are required : to , subjects and body."
        })
    }

    // step 2: get the authenticated user (sender ) from the token 
    const sender = req.user // Assuming `req.user` is set after token verification

    // step 3: Find the recipient(s) in the database
    const recipients = await UserActivation.find({
        email:{$in :to}

    })

    if (recipients.length === 0) {
        return res.status(404).json({ message: "Recipient(s) not found." });
    }
    // Step 4 create and save the mail entry in the database
    const mail = new Mail({
        sender:sender._id,
        recipients:recipients.map((recipient)=> recipient._id),
        subject,
        body,
        isRead: false,
        sendAt: new Date(),
    })
    await mail.save()

    // Step 5: Return a success response
    res.status(200).json({
        message:"Mail sent successfully",
        mails:{
            id:mail._id,
            sender: sender.email,
            recipients:recipients.map((recipient)=> recipient.email),
            subject,
            body,
            sendAt:mail.sendAt,
        }
    })
  } catch (error) {
    console.error("Error sending mail:", error);
    res
      .status(500)
      .json({ message: "An error occurred while sending the email.", error });
  }
};

export const getSentMails = async (req, res) => {
  try {
    console.log("object sent");
    const sentMails = await Mail.find({sender: req.user._id})
    .select("sentAt body.blocks is Read subject _id")
    .populate("recipients","email");

    res.status(200).json(sentMails)
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sent mails.", error });
  }
};

export const getSentMailById = async (req, res) => {
  try {
    const mail = await Mail.findById(req.params.id)
    .populate("sender","email")
    .populate("recipients","email")

    if (!mail) {
        return res.status(404).json({
            message:"Mail not found."
        })
    }
    mail.isRead = true;
    await mail.save()
    res.status(200).json(mail);
  } catch (error) {
    console.error("Error retrieving mail:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the email.",
      error,
    });
  }
};

export const getReceivedMails = async (req, res) => {
  try {
    console.log("Getting");
    const receivedMails = await Mail.find({
        recipients:req.user._id

    }).select("send At body.blocks is Read subject _id").populate("sender","email");

    res.status(200).json(receivedMails)

  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Error retrieving received mails.", error });
  }
};

export const deleteSentMail = async (req, res) => {
  try {
    const mail = await  Mail.findByIdAndDelete(req.params.id);

    if (!mail) {
        return res.status(404).json({
            message: "Mail not found"
        })
    }
    res.status(200).json({message:"Mail deleted successfully"})
  } catch (error) {
    console.error("Error deleting mail:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the email.", error });
  }
};
