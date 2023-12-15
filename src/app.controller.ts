import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import {
  CombinedRequestDto,
  GitHubRepoRequestDto,
} from './dto/github-repo-request.dto';
import { WeatherRequestDto } from './dto/weather-request.dto';
import { IGitHubRepo } from './interface/github';
import { ISummaryData, WeatherData } from './interface/weather';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Get user repositories.
   *
   * @route GET /user/repos
   * @summary Get user repositories
   * @returns {Promise<IGitHubRepo[]>} Successful response
   * @param {GitHubRepoRequestDto} params - The parameters for the request.
   * @throws {BadRequestException} Failed to fetch GitHub data
   */
  @Get('user/repos')
  @ApiOperation({ summary: 'Get user repositories' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
  })
  async getUserRepos(
    @Query() params: GitHubRepoRequestDto,
  ): Promise<IGitHubRepo[]> {
    const { username, page, perPage } = params;
    return this.appService.getUserRepos(username, page, perPage);
  }

  /**
   * Get user repositories and current weather for a city.
   *
   * @route GET /summery
   * @summary Get user repositories and current weather for a city
   * @returns {Promise<CombinedResponse>} Successful response
   * @throws {BadRequestException} Failed to fetch data
   */
  @Get('summery')
  @ApiOperation({
    summary: 'Get user repositories and current weather for a city',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
  })
  async getCombinedData(
    @Query() params: CombinedRequestDto,
  ): Promise<ISummaryData> {
    return this.appService.getSummeryData(params);
  }

  /**
   * Get current weather.
   *
   * @route GET /weather/:city
   * @summary Get current weather
   * @returns {Promise<AxiosResponse<WeatherData>>} Successful response
   * @param {WeatherRequestDto} params - The parameters for the request.
   * @throws {BadRequestException} Failed to fetch weather data
   */
  @Get('weather/:city')
  @ApiOperation({ summary: 'Get current weather of the city' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
  })
  async getCurrentWeather(
    @Param() params: WeatherRequestDto,
  ): Promise<WeatherData> {
    const { city } = params;
    return this.appService.getCurrentWeather(city);
  }

  /**
   * Upload a file.
   * @param {Express.Multer.File} file - The uploaded file object.
   * @returns {Promise<any>} An object containing the filename and size.
   */
  @Post('upload')
  @ApiOperation({ summary: 'Upload a png or jpeg file' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_req, file, callback) => {
        if (!file) {
          callback(new NotFoundException('File Not Found'), false);
        }
        if (['image/png', 'image/jpeg'].includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'Invalid file format. Only PNG and JPG allowed',
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return { filename: file.originalname, size: file.size };
  }
}
