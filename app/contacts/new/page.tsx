import ContactsFormContainer from "../../components/contacts/ContactsFormContainer";
import NavigationBar from "../../components/navigation/Navbar";

const ContactsPage = () => {
  return (
    <div className="flex">
      <NavigationBar />
      <main className="min-h-screen items-center justify-center bg-white px-4 py-10">
        <div>
          <ContactsFormContainer />
        </div>
      </main>
    </div>
  );
};

export default ContactsPage;
