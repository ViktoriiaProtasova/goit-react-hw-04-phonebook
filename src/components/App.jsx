import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import ContactList from './Contacts/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContact = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`Oops! ${name} is already in contacts.`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      setContacts([newContact, ...contacts]);
    }
  };

  const handleFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const getFilteredContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        color: '#010101',
      }}
    >
      <div className="formWrapper">
        <h1>Phonebook</h1>
        <Form createContact={createContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilter} />
        <ContactList contacts={getFilteredContact()} onDelete={deleteContact} />
      </div>
    </div>
  );
};

export default App;
