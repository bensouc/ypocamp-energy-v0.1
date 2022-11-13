require "test_helper"

class ResultsControllerTest < ActionDispatch::IntegrationTest
  test "should get calculate" do
    get results_calculate_url
    assert_response :success
  end

  test "should get show" do
    get results_show_url
    assert_response :success
  end
end
