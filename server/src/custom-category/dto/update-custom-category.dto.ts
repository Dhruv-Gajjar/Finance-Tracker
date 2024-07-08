import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomCategoryDto } from './create-custom-category.dto';

export class UpdateCustomCategoryDto extends PartialType(CreateCustomCategoryDto) {}
