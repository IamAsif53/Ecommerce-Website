import resend from "../config/mail.js";
import Contact from "../models/Contact.js";

// ==============================
// Send Contact Message
// ==============================

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save into MongoDB

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Email Content

    const { data, error } = await resend.emails.send({
      from: "TechIT <onboarding@resend.dev>",
      to: ["jiaulasif4877@gmail.com"],

      subject: `📩 New Contact Message: ${subject}`,

      html: `
    <div style="font-family:Arial,sans-serif;padding:20px">
      <h2>New Contact Form Submission</h2>

      <hr>

      <p><strong>Name:</strong> ${name}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Subject:</strong> ${subject}</p>

      <p><strong>Message:</strong></p>

      <div style="padding:15px;background:#f5f5f5;border-radius:8px">
        ${message.replace(/\n/g, "<br>")}
      </div>

      <hr>

      <small>
        This email was sent automatically from your TechIT website.
      </small>
    </div>
  `,
    });

    if (error) {
      console.error("Resend Error:", error);
      throw new Error(error.message);
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    console.error("Contact Email Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};
// ======================================
// Get All Contact Messages
// ======================================

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

// ======================================
// Mark Message As Read
// ======================================

export const markMessageAsRead = async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        status: "Read",
      },
      { new: true },
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update message",
    });
  }
};

// ======================================
// Delete Message
// ======================================

export const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};
