import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { NewRecipeInput } from './dto/new-recipe.input'
import { RecipesArgs } from './dto/recipes.args'
import { Recipe } from './models/recipe'
import { RecipesService } from './recipes.service'

@Resolver((of: void) => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(returns => Recipe)
  async recipe(@Args('id') id: string): Promise<Recipe> {
    const recipe = await this.recipesService.findOneById(id)
    if (!recipe) {
      throw new NotFoundException(id)
    }
    return recipe
  }

  @Query(returns => [Recipe])
  recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs)
  }

  @Mutation(returns => Recipe)
  async addRecipe(@Args('newRecipeData') newRecipeData: NewRecipeInput): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData)
    return recipe
  }

  @Mutation(returns => Boolean)
  async removeRecipe(@Args('id') id: string): Promise<boolean> {
    return this.recipesService.remove(id)
  }
}
