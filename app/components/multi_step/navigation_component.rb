class MultiStep::NavigationComponent < ViewComponent::Base
  def initialize(steps:, disable_forward_jump: false)
    @steps = steps
    @disable_forward_jump = disable_forward_jump
  end

  attr_reader :steps, :disable_forward_jump
end
