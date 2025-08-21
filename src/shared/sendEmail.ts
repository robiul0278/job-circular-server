import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, link: string) => {

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Gmail এর 587 পোর্টের জন্য সবসময় false
      auth: {
        user: config.smtp_user,
        pass: config.smtp_pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"Diploma Jobs BD" <robiul0278@gmail.com>',
      to,
      subject: "🔐 পাসওয়ার্ড রিসেট করুন - ১০ মিনিটের মধ্যে কার্যকর",
      html: `
      <div style="background-color:#f7f7f7; padding:20px; font-family:Arial, sans-serif; line-height:1.5;">
        <div style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 0 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background-color:#4CAF50; padding:20px; text-align:center;">
            <h2 style="color:white; margin:0;">পাসওয়ার্ড রিসেট অনুরোধ</h2>
          </div>
          
          <!-- Body -->
          <div style="padding:30px;">
            <p>প্রিয় ব্যবহারকারী,</p>
            <p>নিচের বোতামে ক্লিক করে পাসওয়ার্ড রিসেট করুন। এই লিংকটি <strong>১০ মিনিট</strong> পরে মেয়াদোত্তীর্ণ হবে।</p>
            
            <div style="text-align:center; margin:30px 0;">
              <a href="${link}" style="display:inline-block; background-color:#4CAF50; color:white; padding:12px 25px; text-decoration:none; border-radius:5px; font-weight:bold;">
                পাসওয়ার্ড রিসেট করুন
              </a>
            </div>

            <p>যদি আপনি পাসওয়ার্ড রিসেট করার অনুরোধ না করে থাকেন, তবে এই ইমেইলটি উপেক্ষা করুন। আপনার অ্যাকাউন্ট নিরাপদ থাকবে।</p>
            <p>ধন্যবাদ</p>
          </div>

          <!-- Footer -->
          <div style="background-color:#f0f0f0; color:#888; text-align:center; font-size:12px; padding:15px;">
            <p>© ${new Date().getFullYear()} diplomajobsbd.com. সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </div>
      `,
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error: any) {
    console.error("❌ Email sending failed:", error.message || error);
    return { success: false, error: error.message || "Unknown error" };
  }
};
