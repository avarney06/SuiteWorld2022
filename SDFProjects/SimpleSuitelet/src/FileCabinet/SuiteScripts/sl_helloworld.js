/** 
 *@NApiVersion 2.1
 *@NScriptType Suitelet
*/
/*jshint esversion: 9*/
define([
    'N/ui/serverWidget',
    'N/record',
    'N/search',
    'N/log'
],
    (serverWidget, record, search, log) => {
        const onRequest = context => {
            log.debug('Context', context);
            let form = serverWidget.createForm({
                title: 'Hello World',
                hideNavbar: false
            });
            let parameters = context.request.parameters;
            log.debug('Parameters', parameters);
            try {
                if (context.request.method === 'GET') {
                    let customerId = parameters.customerid;
                    log.audit('Customer Id', customerId);
                    buildGetForm(form, customerId);
                } else {
                    let helloText = parameters.custpage_hello;
                    let customerId = parameters.custpage_customerid;
                    let savedId = record.submitFields({
                        type: record.Type.CUSTOMER,
                        id: customerId,
                        values: {
                            comments: helloText
                        }
                    });
                    log.audit('Cust Saved', savedId);
                    let customerLookup = getCustomerDetails(customerId);
                    buildPostForm(form, customerLookup);
                }
            } catch (e) {
                form = serverWidget.createForm({
                    title: 'Hello World Error',
                    hideNavbar: false
                });
                form.addField({
                    id: 'custpage_error',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'Form Error'
                })
                .updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.INLINE
                })
                .defaultValue = `Error Title: ${e.name}\nError Message: ${e.message}`;
            }
            context.response.writePage(form);
            return;
        };

        const buildGetForm = (form, customerId) => {
            let customerLookup = getCustomerDetails(customerId);
            log.debug('Customer Lookup', customerLookup);
            form.addField({
                id: 'custpage_comments',
                type: serverWidget.FieldType.TEXTAREA,
                label: 'Current Comments'
            })
            .updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE
            })
            .defaultValue = customerLookup.comments;
            form.addField({
                id: 'custpage_customerid',
                type: serverWidget.FieldType.TEXT,
                label: 'Customer Id'
            })
            .updateDisplayType({
                displayType: serverWidget.FieldDisplayType.NODISPLAY
            })
            .defaultValue = customerId;
            form.addField({
                id: 'custpage_hello',
                label: 'Hello Text',
                type: serverWidget.FieldType.TEXTAREA
            })
            .defaultValue = 'Hello World';
            form.addSubmitButton({
                label: 'Save'
            });
        };

        const buildPostForm = (form, customerLookup) => {
            form.addField({
                id: 'custpage_success',
                label: 'Success',
                type: serverWidget.FieldType.TEXT
            })
            .updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE
            })
            .defaultValue = `Customer Id ${customerLookup.internalid[0].value} was saved successfully.`;
        };

        const getCustomerDetails = customerId => {
            return search.lookupFields({
                type: search.Type.CUSTOMER,
                id: customerId,
                columns: [
                    'comments',
                    'internalid'
                ]
            });
        }; 

        return {
            onRequest:onRequest
        };
    }
);