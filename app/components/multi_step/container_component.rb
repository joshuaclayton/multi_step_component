class MultiStep::ContainerComponent < ViewComponent::Base
  renders_many :steps, MultiStep::StepComponent
  renders_one :next_button, MultiStep::NextButtonComponent

  def initialize(options = {})
    @starting_step = options.fetch(:starting_step, 0)
  end

  def steps_count
    steps.count
  end

  def step_content
    render MultiStep::StepContentComponent.new(steps:, starting_step:)
  end

  def navigation(**args)
    final_args = args.merge(steps:)
    render MultiStep::NavigationComponent.new(**final_args)
  end

  def previous_button(**args)
    render MultiStep::PreviousButtonComponent.new(**args)
  end

  private

  attr_reader :starting_step
end
