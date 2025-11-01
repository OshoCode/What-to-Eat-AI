import {Router} from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send('All Subscription');
});

subscriptionRouter.get('/:id', (req, res) => {
    res.send('Subscription Details');
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send('Get Upcoming-renewals');
});

subscriptionRouter.post('/', (req, res) => {
    res.send('Create Subscription');
});

subscriptionRouter.put('/:id', (req, res) => {
    res.send('Update Subscription');
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send('Cancel Subscription');
});

subscriptionRouter.patch('/:id', (req, res) => {
    res.send('Update Subscription Details');
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send('Delete Subscription');
});

export default subscriptionRouter;