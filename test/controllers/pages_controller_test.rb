require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get form" do
    get pages_form_url
    assert_response :success
  end
end
