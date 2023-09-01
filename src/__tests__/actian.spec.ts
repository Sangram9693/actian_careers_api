import Message from '../lib/appconstants';
import ActianController from '../controllers/actian.controller';
import ActianService from '../services/actian.service';
import { Request, Response } from 'express';
import {
  createRequest, createResponse, MockRequest, MockResponse,
} from 'node-mocks-http';

describe('Unit test for actian_careers_api', () => {
  let controller: ActianController;
  let service: ActianService;
  let request: MockRequest<Request>;
  let response: MockResponse<Response>;
  beforeEach(() => {
    controller = new ActianController();
    service = new ActianService();
    response = createResponse();
  });

  it(`Check ${Message.REQUIRED} message`, () => {
    request = createRequest({
      method: 'GET',
      url: '/actian/?department=',
    });
    
    controller.getOperations(request, response);
    const obj = {
      status: 400,
      message: Message.REQUIRED,
      data: undefined
    }
    expect(response._getData()).toMatchObject(obj);
  });

  it('actian.service.ts -> getJob(): Should return undefined', () => {
    const result = service.getJob('');
    expect(result).toBe(undefined);
  })
})