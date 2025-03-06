import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "James@setoriasecurity.co.uk",
        pass: process.env.NODEMAILER_PASSWORD, // Use environment variables instead
      },
    });

    // Verify connection configuration
    await transporter.verify();

    // Styled Email Template
    const mailData = {
      from: "james@setoriasecurity.co.uk",
      to: "james@setoriasecurity.co.uk",
      replyTo: body.email, // Set reply-to as customer's email
      subject: `New Contact Request from ${body.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333;">📩 New Contact Request</h2>
          <p style="font-size: 16px; color: #555;">You have received a new message from the contact form:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="background-color: #f1f1f1; padding: 10px; font-weight: bold;">👤 Name:</td>
              <td style="padding: 10px;">${body.name}</td>
            </tr>
            <tr>
              <td style="background-color: #f1f1f1; padding: 10px; font-weight: bold;">📧 Email:</td>
              <td style="padding: 10px;"><a href="mailto:${
                body.email
              }" style="color: #007BFF; text-decoration: none;">${
        body.email
      }</a></td>
            </tr>
            <tr>
              <td style="background-color: #f1f1f1; padding: 10px; font-weight: bold;">📞 Phone:</td>
              <td style="padding: 10px;">${body.phone || "N/A"}</td>
            </tr>
            <tr>
              <td style="background-color: #f1f1f1; padding: 10px; font-weight: bold;">💬 Message:</td>
              <td style="padding: 10px;">${body.message.replace(
                /\n/g,
                "<br>"
              )}</td>
            </tr>
          </table>
          <p style="font-size: 14px; color: #777; margin-top: 20px;">This message was sent via your website's contact form.</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailData);

    // Respond with success
    return new Response("Message sent successfully", { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response("An error occurred while sending the message", {
      status: 500,
    });
  }
}
