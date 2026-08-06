import { PartialType } from '@nestjs/mapped-types';
import { CreateForgetPasswordDto } from './create-forget-password.dto';

export class UpdateForgetPasswordDto extends PartialType(CreateForgetPasswordDto) {}
