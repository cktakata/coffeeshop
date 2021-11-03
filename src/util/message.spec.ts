import { Message } from "./message"

describe('Message', () => {
    let message: Message;

    beforeEach(async() => {
        message = new Message();
    })

    describe('root', () => {
        it('should test messages', async() => {
            message.info([`[TestClass]`, `Log Test`])
            message.log([`[TestClass]`, `Log Test`])
            message.error([`[TestClass]`, `Log Test`])
        })
    })
})