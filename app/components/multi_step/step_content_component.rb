class MultiStep::StepContentComponent < ViewComponent::Base
  def initialize(steps:, starting_step:)
    @starting_step = starting_step
    @steps = steps
  end

  attr_reader :steps, :starting_step
end
