import {Adapter, Config, ContactTemplate, ContactUpdate} from "@clinq/bridge";

export class OneSalesAdapter implements Adapter {

	public async getContacts(config: Config) {
		return [];
	}

	public async createContact(config: Config, contact: ContactTemplate) {
		return {
			id: '',
			contactUrl: null,
			avatarUrl: null,
			name: null,
			firstName: null,
			lastName: null,
			email: null,
			organization: null,
			phoneNumbers: []
		};
	}

	public async updateContact(config: Config, id: string, contact: ContactUpdate) {
		return {
			id: '',
			contactUrl: null,
			avatarUrl: null,
			name: null,
			firstName: null,
			lastName: null,
			email: null,
			organization: null,
			phoneNumbers: []
		};
	}

	public async deleteContact(config: Config, id: string) {
		throw new Error('not yet implemented');
	}

	public async getOAuth2RedirectUrl(): Promise<string> {
		throw new Error('not yet implemented');
	}
};
