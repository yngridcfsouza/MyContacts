import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { ListHeader, Card } from './styles';

import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';

export default function ContactsList({
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
  filteredContacts
}) {
  return(
    <>
      <ListHeader $orderBy={orderBy}>
        {filteredContacts.length > 0 && (
          <button type="button" onClick={onToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow"/>
          </button>
        )}
      </ListHeader>

      {filteredContacts.map((contact) =>(
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category.name && (
                <small>{contact.category.name}</small>
              )}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>
          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit"></img>
            </Link>
            <button
              type="button"
              onClick={() => onDeleteContact(contact)}
            >
            <img src={trash} alt="Delete"></img>
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}

ContactsList.propTypes = {
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
}
