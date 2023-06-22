import json
from channels.generic.websocket import AsyncWebsocketConsumer

class LogsConsumer(AsyncWebsocketConsumer):
    group_name = 'log_group'

    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.send(text_data=json.dumps({
            'type': 'log_message',
            'message': 'Log Websockets Connected'
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        await self.send(text_data=json.dumps({
            'type': 'log_message',
            'message': 'Log Websockets Disconnected'
        }))

    async def receive(self, text_data):
        pass

    async def log_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'type': 'log_message',
            'message': message
        }))

class StatusConsumer(AsyncWebsocketConsumer):
    group_name = 'status_group'

    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.send(text_data=json.dumps({
            'type': 'status_message',
            'message': 'Status Websockets Connected'
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        await self.send(text_data=json.dumps({
            'type': 'status_message',
            'message': 'Status Websockets Disconnected'
        }))

    async def receive(self, text_data):
        pass

    # status = "taking_attendance" | "encoding_images" | "none"
    async def status_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'type': 'status_message',
            'message': message
        }))

class AttendanceConsumer(AsyncWebsocketConsumer):
    group_name = 'attendance_group'

    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.send(text_data=json.dumps({
            'type': 'attendance_message',
            'message': 'Attendance Websockets Connected'
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        await self.send(text_data=json.dumps({
            'type': 'attendance_message',
            'message': 'Attendance Websockets Disconnected'
        }))

    async def receive(self, text_data):
        pass

    # message = {present_users:[{name, email}], absent_users:[{name, email}]}
    async def attendance_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'type': 'attendance_message',
            'message': message
        }))