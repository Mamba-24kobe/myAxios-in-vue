const CONTACT_LIST_API = {
    getContactList: {
        method: 'get',
        url: 'contactList'
    },
    addContactJson: {
        method: 'post',
        url: 'contact/add/json'
    },
    addContactForm: {
        method: 'post',
        url: 'contact/add/form'
    },
    editContact: {
        method: 'put',
        url: 'contact/edit'
    },
    deleteContact: {
        method: 'delete',
        url: 'contact/del'
    },
}
export default CONTACT_LIST_API