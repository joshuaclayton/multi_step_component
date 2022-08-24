class MultiStep::PreviousButtonComponent < ViewComponent::Base
  def initialize(hidden_on_start: false)
    @hidden_on_start = !!hidden_on_start
  end

  attr_reader :hidden_on_start
end
