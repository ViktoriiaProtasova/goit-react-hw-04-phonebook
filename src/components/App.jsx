import React from 'react';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import ContactList from './Contacts/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  createContact = data => {
    if (this.state.contacts.find(contact => contact.name === data.name)) {
      alert(`Oops! ${data.name} is already in contacts.`);
    } else {
      const newContact = {
        id: nanoid(),
        ...data,
      };

      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  handleFilter = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  getFilteredContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const { filter } = this.state;
    const filteredContact = this.getFilteredContact();

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
          <Form createContact={this.createContact} />
          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.handleFilter} />
          <ContactList
            contacts={filteredContact}
            onDelete={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
