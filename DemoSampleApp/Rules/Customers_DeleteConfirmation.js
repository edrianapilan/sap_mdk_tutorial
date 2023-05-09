/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Customers_DeleteConfirmation(context) {
    return context.executeAction('/DemoSampleApp/Actions/Customers_DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return context.executeAction('/DemoSampleApp/Actions/Customers_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

