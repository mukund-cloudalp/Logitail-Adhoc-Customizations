/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */

let WEBOOK_PARAM_ID = "custscript_webhook_url";

define(['N/https', 'N/record', 'N/search', 'N/runtime'],
    /**
 * @param{https} https
 * @param{record} record
 * @param{search} search
 */
    (https, record, search, runtime) => {

        const afterSubmit = (scriptContext) => {

            try {

                var requestUrl = "";
                
                if(scriptContext.type === scriptContext.UserEventType.CREATE || scriptContext.type === scriptContext.UserEventType.EDIT){
                     
                     requestUrl = runtime.getCurrentScript().getParameter({name: WEBOOK_PARAM_ID});
                     if(requestUrl !== '' && requestUrl !== null ){


                        log.debug('requestUrl', requestUrl);

                        let response = https.get({
                            url: requestUrl
                         })
                         
                         log.debug('Webhook Triggered', JSON.stringify({
                            code: response.code,
                            body: response.body
                        }));
                     }
                }
                
            } catch (error) {
                log.error('error', error);
            }

        }

        return {afterSubmit}

    });
