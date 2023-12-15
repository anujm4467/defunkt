import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { AppService } from './app.service';
import { IGitHubRepo } from './interface/github';
import { WeatherData, ISummaryData } from './interface/weather';

jest.mock('axios');

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('getUserRepos', () => {
    it('should fetch user repositories successfully', async () => {
      const mockUserRepos: IGitHubRepo[] = [
        { full_name: 'repo1', id: 1, name: 'Repo 1' },
      ];
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUserRepos });

      const result = await appService.getUserRepos('username', '1', '10');

      expect(result).toEqual(mockUserRepos);
    });

    it('should throw BadRequestException on fetch error', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

      await expect(
        appService.getUserRepos('username', '1', '10'),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('getCurrentWeather', () => {
    it('should fetch current weather successfully', async () => {
      const mockWeatherData: WeatherData = {
        coord: { lon: 72.8479, lat: 19.0144 },
        weather: [
          { id: 711, main: 'Smoke', description: 'smoke', icon: '50d' },
        ],
        base: 'stations',
        main: {
          temp: 302.14,
          feels_like: 301.66,
          temp_min: 302.09,
          temp_max: 302.14,
          pressure: 1016,
          humidity: 39,
        },
        visibility: 2200,
        wind: { speed: 4.63, deg: 70 },
        clouds: { all: 0 },
        dt: 1702618275,
        sys: {
          type: 1,
          id: 9052,
          country: 'IN',
          sunrise: 1702604022,
          sunset: 1702643601,
        },
        timezone: 19800,
        id: 1275339,
        name: 'Mumbai',
        cod: 200,
      };

      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockWeatherData });

      const result = await appService.getCurrentWeather('city');

      expect(result).toEqual(mockWeatherData);
    });

    it('should throw BadRequestException on fetch error', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

      await expect(appService.getCurrentWeather('city')).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('getSummeryData', () => {
    it('should fetch summary data successfully', async () => {
      const mockUserRepos: IGitHubRepo[] = [
        { full_name: 'repo1', id: 1, name: 'Repo 1' },
      ];
      const mockWeatherData: WeatherData = {
        coord: { lon: 72.8479, lat: 19.0144 },
        weather: [
          { id: 711, main: 'Smoke', description: 'smoke', icon: '50d' },
        ],
        base: 'stations',
        main: {
          temp: 302.14,
          feels_like: 301.66,
          temp_min: 302.09,
          temp_max: 302.14,
          pressure: 1016,
          humidity: 39,
        },
        visibility: 2200,
        wind: { speed: 4.63, deg: 70 },
        clouds: { all: 0 },
        dt: 1702618275,
        sys: {
          type: 1,
          id: 9052,
          country: 'IN',
          sunrise: 1702604022,
          sunset: 1702643601,
        },
        timezone: 19800,
        id: 1275339,
        name: 'Mumbai',
        cod: 200,
      };

      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUserRepos });
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockWeatherData });

      const result = await appService.getSummeryData({
        username: 'username',
        page: '1',
        perPage: '10',
        city: 'city',
      });

      const expectedSummaryData: ISummaryData = {
        userRepo: [{ full_name: 'repo1', id: 1, name: 'Repo 1' }],
        weatherData: {
          base: 'stations',
          weather: [
            { id: 711, main: 'Smoke', description: 'smoke', icon: '50d' },
          ],
        },
      };

      expect(result).toEqual(expectedSummaryData);
    });

    it('should throw Error on fetch error', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

      await expect(
        appService.getSummeryData({
          username: 'username',
          page: '1',
          perPage: '10',
          city: 'city',
        }),
      ).rejects.toThrowError(Error);
    });
  });
});
