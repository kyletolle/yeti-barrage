require 'test_helper'

class YetisControllerTest < ActionController::TestCase
  setup do
    @yeti = yetis(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:yetis)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create yeti" do
    assert_difference('Yeti.count') do
      post :create, yeti: { lat: @yeti.lat, long: @yeti.long, name: @yeti.name }
    end

    assert_redirected_to yeti_path(assigns(:yeti))
  end

  test "should show yeti" do
    get :show, id: @yeti
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @yeti
    assert_response :success
  end

  test "should update yeti" do
    put :update, id: @yeti, yeti: { lat: @yeti.lat, long: @yeti.long, name: @yeti.name }
    assert_redirected_to yeti_path(assigns(:yeti))
  end

  test "should destroy yeti" do
    assert_difference('Yeti.count', -1) do
      delete :destroy, id: @yeti
    end

    assert_redirected_to yetis_path
  end
end
