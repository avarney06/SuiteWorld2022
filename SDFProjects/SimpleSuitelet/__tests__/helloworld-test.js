/*jshint esversion: 9*/
import Suitelet from 'SuiteScripts/sl_helloworld';
import record from 'N/record';
import search from 'N/search';
import serverWidget from 'N/ui/serverWidget';
import Form from 'N/ui/serverWidget/forminstance';
import Field from 'N/ui/serverWidget/field';

jest.mock('N/record');
jest.mock('N/record/instance');
jest.mock('N/search');
jest.mock('N/ui/serverWidget');
jest.mock('N/ui/serverWidget/forminstance');
jest.mock('N/ui/serverWidget/field');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Suitelet GET Test', () => {
    it('Customer 6 should have been searched', () => {
        let context = {
            request: {
                method: 'GET',
                parameters: {
                    customerid: 6
                }
            },
            response: {
                writePage() {return Form;}
            }
        };

        const customerLookup = {
            comments: 'Foo Bar',
            internalid: [
                {
                    value: 6,
                    text: "6"
                }
            ]
        };

        const lookupOptions = {
            type: search.Type.CUSTOMER,
            id: 6,
            columns: [
                'comments',
                'internalid'
            ]
        };

        serverWidget.createForm.mockReturnValue(Form);
        Form.addField.mockReturnValue(Field);
        Field.updateDisplayType.mockReturnValue(Field);
        search.lookupFields.mockReturnValue(customerLookup);

        Suitelet.onRequest(context);

        expect(search.lookupFields).toHaveBeenCalledWith(lookupOptions);
        expect(Form.addField).toHaveBeenCalledWith({
            id: 'custpage_hello',
            label: 'Hello Text',
            type: serverWidget.FieldType.TEXTAREA
        });
        expect(Field.defaultValue).toBe("Hello World");
    });
});

describe('Suitelet POST Test', () => {
    it('Customer 6 should have been updated', () => {
        let context = {
            request: {
                method: 'POST',
                parameters: {
                    custpage_customerid: '6',
                    custpage_hello: 'Hello World'
                }
            },
            response: {
                writePage() {return Form;}
            }
        };

        const customerLookup = {
            comments: 'Hello World',
            internalid: [
                {
                    value: 6,
                    text: "6"
                }
            ]
        };

        const lookupOptions = {
            type: search.Type.CUSTOMER,
            id: '6',
            columns: [
                'comments',
                'internalid'
            ]
        };

        serverWidget.createForm.mockReturnValue(Form);
        Form.addField.mockReturnValue(Field);
        Field.updateDisplayType.mockReturnValue(Field);
        search.lookupFields.mockReturnValue(customerLookup);
        record.submitFields.mockReturnValue(6);

        Suitelet.onRequest(context);

        expect(search.lookupFields).toHaveBeenCalledWith(lookupOptions);
        expect(record.submitFields).toHaveBeenCalledWith({
            type: record.Type.CUSTOMER,
            id: context.request.parameters.custpage_customerid,
            values: {
                comments: context.request.parameters.custpage_hello
            }
        });
        expect(Field.defaultValue).toBe(`Customer Id ${customerLookup.internalid[0].value} was saved successfully.`);
    });
});