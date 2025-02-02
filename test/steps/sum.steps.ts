import { Given, Then, When } from '@cucumber/cucumber'
import * as assert from 'assert'

type SumProps = {
  A: number
  B: number
  result: number
}

const sum = (A: number, B: number) => A + B

Given<SumProps>('a number {int}', function (A: number) {
  this.A = A
})

Given<SumProps>('another number {int}', function (B: number) {
  this.B = B
})

When<SumProps>('sum is called', function () {
  this.result = sum(this.A, this.B)
})

Then<SumProps>('it should return {int}', function (SumAB: number) {
  assert.strictEqual(this.result, SumAB)
})
