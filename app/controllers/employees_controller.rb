class EmployeesController < ApplicationController
  
  
  def index
    # @users = User.limit(2).order("id DESC")
    
    @objects = Employee.page(params[:page]).per(params[:limit]).order("id DESC")

    respond_to do |format|
      format.json { render :json => { :employees => @objects , :total => Employee.all.count } }
    end
  end

  def create
    @object = Employee.new(params[:employee])

    respond_to do |format|
      if @object.save
        format.json { render :json => { :success => true, :employees => [@object] , 
                                        :total => Employee.all.count } }
      end
    end
  end

  def update
    @object = Employee.find(params[:id])
    # sleep 2 
    respond_to do |format|
      if @object.update_attributes(params[:employee])
        format.json { render :json => { :success => true, :employees => [@object],
                                        :total => Employee.all.count  } }
      end
    end
  end

  def destroy
    @object = Employee.find(params[:id])
    @object.destroy

    respond_to do |format|
      format.json { render :json => { :success => true, :total => Employee.all.count } }
    end
  end
end
