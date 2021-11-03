import { NestFactory } from '@nestjs/core';
import * as main from './main'

var sinon = require('sinon');

describe('Main', () => {
    beforeEach(async () => {
        sinon.restore()
        sinon.stub(NestFactory, "create").resolves(Promise.resolve({}))
    })

    describe('root', () => {
        it('should start server', async () => {
            main
        })
    })
})