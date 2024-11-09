import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Aarav Rao</p>
          <p className="text-sm text-muted-foreground">
            aarav.rao@email.in
          </p>
        </div>
        <div className="ml-auto font-medium">+₹1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>KS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Kavya Sharma</p>
          <p className="text-sm text-muted-foreground">kavya.sharma@email.in</p>
        </div>
        <div className="ml-auto font-medium">+₹239.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>RP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Raj Patel</p>
          <p className="text-sm text-muted-foreground">
            raj.patel@email.in
          </p>
        </div>
        <div className="ml-auto font-medium">+₹799.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sneha Deshmukh</p>
          <p className="text-sm text-muted-foreground">sneha.deshmukh@email.in</p>
        </div>
        <div className="ml-auto font-medium">+₹99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>MP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Meera Pillai</p>
          <p className="text-sm text-muted-foreground">meera.pillai@email.in</p>
        </div>
        <div className="ml-auto font-medium">+₹59.00</div>
      </div>
    </div>
  );
}
