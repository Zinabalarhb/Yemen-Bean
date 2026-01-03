import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
 

export default function AccountPage() {
  return (
    <>
  
      <section className="account-section container py-5" dir="rtl">
        <h2 className="text-center mb-5">حساب المستخدم</h2>
        <p className="text-center">يمكنك هنا إدارة بياناتك ومعلوماتك الشخصية.</p>
      </section>
      <Footer />
    </>
  );
}
