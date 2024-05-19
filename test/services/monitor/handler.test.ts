import {handler} from "../../../src/services/monitor/handler";


describe('GIVEN Monitor lambda', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')
  fetchSpy.mockImplementation(() => Promise.resolve({} as any))

  afterEach(()=>{
    jest.clearAllMocks();
  })

  test('SHOULD makes request for records in SNSEvent', async () => {
    const snsEvent = {
      Records: [{
        Sns: {
          Message: 'Test message'
        }
      }
      ]
    } as any


    await handler(snsEvent, {})

    expect(fetchSpy).toHaveBeenCalled()
    expect(fetchSpy).toHaveBeenCalledWith(expect.any(String), {
      method: "POST",
      body: JSON.stringify({
        "text": `SNS ${'Test message'}`
      })
    })

  })

  test('SHOULD no be called SNSEvent', async () => {
    const snsEvent2 = {
      Records: []
    } as any

    await handler(snsEvent2, {})

    expect(fetchSpy).not.toHaveBeenCalled()

  })
});
