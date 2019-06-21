import {ContactTemplate, PhoneNumberLabel} from "@clinq/bridge";
import {IOneSalesContact} from "./model";

	export function toCrmContact(contact: ContactTemplate): IOneSalesContact {

		// tslint:disable-next-line
		console.log(contact);

		const [phone, mobile] = [PhoneNumberLabel.WORK, PhoneNumberLabel.MOBILE]
		.map(label => contact.phoneNumbers ? contact.phoneNumbers
			.filter(phoneNumber => phoneNumber.label === label)
			.map(phoneNumber => phoneNumber.phoneNumber).find(e => true) || "" : "");

		return {
			firstName: contact.firstName || "",
			lastName: contact.lastName|| "",
			email: contact.email|| "",
			company: contact.organization || "",
			phone,
			mobile,
		};
}
