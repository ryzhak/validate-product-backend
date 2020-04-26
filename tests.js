const assert = require('assert');
const mock = require('mock-require');
const request = require('supertest');

let app = require('./server');

describe('API tests', () => {

	beforeEach(() => {
		mock.stopAll();
		refreshMocks();
	});

	describe('GET /', () => {
        it('should return 200', (done) => {
			request(app)
				.get('/')
				.expect(resp => {
					assert.equal(resp.text, 'Validate product backend works!');
				})
				.expect(200, done);
		});
    });

    describe('POST /signup', () => {
		it('should return 422 on invalid project name', (done) => {
			const invalidProject = '';
			request(app)
				.post('/signup')
				.send({
                    project: invalidProject,
                    email: 'user@email.com'
                })
				.expect(resp => {
                    assert.equal(resp.body.errors[0].param, 'project');
					assert.equal(resp.body.errors[0].msg, 'Invalid value');
				})
				.expect(422, done);
        });

        it('should return 422 on invalid email', (done) => {
			const invalidEmail = '';
			request(app)
				.post('/signup')
				.send({
                    project: 'ANY_PROJECT',
                    email: invalidEmail
                })
				.expect(resp => {
                    assert.equal(resp.body.errors[0].param, 'email');
					assert.equal(resp.body.errors[0].msg, 'Invalid value');
				})
				.expect(422, done);
        });

        it('should return 200 and save user', (done) => {
			request(app)
				.post('/signup')
				.send({
                    project: 'ANY_PROJECT',
                    email: 'user@email.com'
                })
				.expect(resp => {
                    assert.equal(resp.text, 'Success');
				})
				.expect(200, done);
        });
    });

    describe('POST /action', () => {
		it('should return 422 on invalid project name', (done) => {
			const invalidProject = '';
			request(app)
				.post('/action')
				.send({
                    project: invalidProject,
                    action: 'ANY_ACTION'
                })
				.expect(resp => {
                    assert.equal(resp.body.errors[0].param, 'project');
					assert.equal(resp.body.errors[0].msg, 'Invalid value');
				})
				.expect(422, done);
        });

        it('should return 422 on invalid action', (done) => {
			const invalidAction = '';
			request(app)
				.post('/action')
				.send({
                    project: 'ANY_PROJECT',
                    action: invalidAction
                })
				.expect(resp => {
                    assert.equal(resp.body.errors[0].param, 'action');
					assert.equal(resp.body.errors[0].msg, 'Invalid value');
				})
				.expect(422, done);
        });

        it('should return 200 and save action', (done) => {
			request(app)
				.post('/action')
				.send({
                    project: 'ANY_PROJECT',
                    action: 'ANY_ACTION'
                })
				.expect(resp => {
                    assert.equal(resp.text, 'Success');
				})
				.expect(200, done);
        });
    });
});

/**
 * Refreshes server mocks
 */
function refreshMocks() {
	app = mock.reRequire('./server');
}
