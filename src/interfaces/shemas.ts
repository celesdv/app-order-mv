export const supplierSchema = {
	name: ''
};

export const clientSchema = {
	first_name: '',
	last_name: '',
	phone: '',
	email: '',
	address: '',
	city: '',
	observation: ''
};

export const orderSchema = {
	client: undefined,
	date: '',
	currency:''
};

export const productSchema = {
	description: '',
	supplier: '',
	ars_value: 0,
	currency: '',
	usd_value: 0,
}
