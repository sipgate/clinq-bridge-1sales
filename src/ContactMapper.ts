import {Contact, ContactTemplate, PhoneNumberLabel} from "@clinq/bridge";
import {IOneSalesContact} from "./model";

export function toCinqContacts(contacts: IOneSalesContact[]): Contact[] {

	if (!contacts || contacts.length === 0) {
		return [];
	}


	return contacts.map(contact => {
		const phoneNumbers = [];

		if (contact.phone) {
			phoneNumbers.push({phoneNumber: contact.phone, label: PhoneNumberLabel.WORK})
		}

		if (contact.mobile) {
			phoneNumbers.push({phoneNumber: contact.mobile, label: PhoneNumberLabel.MOBILE})
		}

		return {
			id: contact.id || "",
			avatarUrl: "",
			contactUrl: "",
			name: `${contact.firstName} ${contact.lastName}`,
			firstName: contact.firstName|| "",
			lastName: contact.lastName|| "",
			email: contact.email || "",
			organization: contact.company|| "",
			phoneNumbers
		};
	});
}

export function toCrmContact(contact: ContactTemplate): IOneSalesContact {

	// tslint:disable-next-line
	console.log(contact);

	const [phone, mobile] = [PhoneNumberLabel.WORK, PhoneNumberLabel.MOBILE]
	.map(label => contact.phoneNumbers ? contact.phoneNumbers
	.filter(phoneNumber => phoneNumber.label === label)
	.map(phoneNumber => phoneNumber.phoneNumber).find(e => true) || "" : "");

	return {
		firstName: contact.firstName || "",
		lastName: contact.lastName || "",
		email: contact.email || "",
		company: contact.organization || "",
		phone,
		mobile,
	};
}
