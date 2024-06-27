import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      example1: {
        summary: 'Example User 1',
        description: 'A simple example of a user',
        value: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: 1234567890,
          address: '123 Main Street, Cityville',
          password: 'securepassword123',
          role: 'user',
          status: 1,
        },
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Return a single user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the user to retrieve',
    examples: {
      example1: {
        summary: 'Example User ID',
        description: 'A valid user ID',
        value: 1,
      },
    },
  })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      example1: {
        summary: 'Example User Update',
        description: 'An example of updating user details',
        value: {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          phone: 9876543210,
          address: '456 Another Street, Townsville',
          role: 'admin',
          status: 1,
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the user to update',
    examples: {
      example1: {
        summary: 'Example User ID',
        description: 'A valid user ID',
        value: 1,
      },
    },
  })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the user to delete',
    examples: {
      example1: {
        summary: 'Example User ID',
        description: 'A valid user ID',
        value: 1,
      },
    },
  })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
