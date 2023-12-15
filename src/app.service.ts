import { BadRequestException, Injectable } from '@nestjs/common';
import { IGitHubRepo } from './interface/github';
import { GITHUB_API_URL, OPENWEATHER_API_URL } from './constant';
import { ISummaryData, WeatherData } from './interface/weather';
import { CombinedRequestDto } from './dto/github-repo-request.dto';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Fetch user repositories from GitHub API.
   *
   * @param {string} username - The GitHub username for which to fetch repositories.
   * @param {string} page - The page string for pagination.
   * @param {string} perPage - The string of repositories per page.
   * @returns {Promise<AxiosResponse<IGitHubRepo>>} The response containing user repositories.
   * @throws {BadRequestException} Throws an exception if the GitHub data fetch fails.
   */
  async getUserRepos(
    username: string,
    page: string,
    perPage: string,
  ): Promise<IGitHubRepo[]> {
    const apiUrl = `${GITHUB_API_URL}/users/${username}/repos`;
    try {
      const response = await axios.get(apiUrl, {
        params: {
          page: page.toString(),
          per_page: perPage.toString(),
        },
      });
      return response.data;
    } catch (error) {
      throw new BadRequestException('Failed to fetch GitHub data');
    }
  }

  /**
   * Fetch current weather information from OpenWeatherMap API.
   *
   * @param {string} city - The city for which to fetch current weather information.
   * @returns {Promise<AxiosResponse<WeatherData>>} The response containing current weather data.
   * @throws {BadRequestException} Throws an exception if the weather data fetch fails.
   */
  async getCurrentWeather(city: string): Promise<WeatherData> {
    const apiKey = process.env.API_KEY;
    const apiUrl = `${OPENWEATHER_API_URL}/weather?q=${city}&appid=${apiKey}`;
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw new BadRequestException('Failed to fetch weather data');
    }
  }

  /**
   * Get summary data including user repositories and current weather.
   *
   * @param {CombinedRequestDto} requestDto - The combined request parameters.
   * @returns {Promise<ISummaryData>} Promise containing user repositories and current weather data.
   * @throws {Error} If there is an error fetching user repositories or current weather data.
   */
  async getSummeryData(requestDto: CombinedRequestDto): Promise<ISummaryData> {
    try {
      const userRepos = await this.getUserRepos(
        requestDto.username,
        requestDto.page,
        requestDto.perPage,
      );

      const userRepoData = userRepos.map((repo) => ({
        full_name: repo.full_name,
        id: repo.id,
        name: repo.name,
      }));

      const { base, weather } = await this.getCurrentWeather(requestDto.city);

      return {
        userRepo: userRepoData,
        weatherData: { base, weather },
      };
    } catch (error) {
      throw new Error('Error fetching summary data: ' + error.message);
    }
  }
}
