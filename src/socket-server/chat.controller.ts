import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/guard/roles.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
}
