/*jshint esversion: 9*/
import Suitelet from 'SuiteScripts/sl_helloworld';
import record from 'N/record';
import Record from 'N/record/instance';
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
    it('Customer 6 should have been loaded', () => {
        const context = {
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
    });
});