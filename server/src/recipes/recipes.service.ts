/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common'
import { NewRecipeInput } from './dto/new-recipe.input'
import { RecipesArgs } from './dto/recipes.args'
import { Recipe } from './models/recipe'

@Injectable()
export class RecipesService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: NewRecipeInput): Promise<Recipe> {
    return {} as Promise<Recipe>
  }

  async findOneById(id: string): Promise<Recipe> {
    return {} as Promise<Recipe>
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return {} as Promise<Recipe[]>
  }

  async remove(id: string): Promise<boolean> {
    return true
  }
}
