import asyncio as aio

async def handle(reader,writer):

    writer.write(b'hihi')
    writer.close()

loop=aio.get_event_loop()
async def main():
    loop.create_task()
    server=await aio.start_server(handle,'0.0.0.0',3000)
    async with server:
        await server.serve_forever()


aio.run(main())