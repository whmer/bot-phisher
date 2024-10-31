import java.util.ArrayList;
import java.util.List;

class Contact {
    private String name;
    private String phoneNumber;

    public Contact(String name, String phoneNumber) {
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
}

class ContactManager {
    private List<Contact> contacts;

    public ContactManager() {
        contacts = new ArrayList<>();
    }

    public void addContact(String name, String phoneNumber) {
        Contact contact = new Contact(name, phoneNumber);
        contacts.add(contact);
        System.out.println("Contato adicionado: " + contact.getName() + " - " + contact.getPhoneNumber());
    }

    public void listContacts() {
        System.out.println("Lista de contatos:");
        for (Contact contact : contacts) {
            System.out.println(contact.getName() + " - " + contact.getPhoneNumber());
        }
    }
}

public class Chatbot {

    private static ContactManager contactManager;

    public static void main(String[] args) {
        contactManager = new ContactManager();


        addContact("João", "123456789");
        addContact("Maria", "987654321");
        listContacts();
    }

    private static void addContact(String name, String phoneNumber) {
        contactManager.addContact(name, phoneNumber);
    }

    private static void listContacts() {
        contactManager.listContacts();
    }
}